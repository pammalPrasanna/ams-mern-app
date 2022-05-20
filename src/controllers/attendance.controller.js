const asyncHandler = require('express-async-handler');
const Attendance = require('../models/attendanceModel');
const Member = require('../models/membersModel');
const { hoursClocked, getDaysInMonth } = require('../utils/time.util');
const momentTz = require('moment-timezone')
const moment = require('moment')
// check in end point
const swipe = asyncHandler(async (req, res) => {
    res.status(500)
    const member = await Member.findOne({ mid: req.user.id });
    const checkedInToday = await Attendance.find({
        mid: member._id,
        check_in: { $gte: new Date().setHours(0, 0, 0, 0) }
    });


    let now = momentTz.tz(moment(), "Asia/Kolkata");

    if (checkedInToday.length > 0) {
        const checkOut = await Attendance.findByIdAndUpdate(checkedInToday[0]._id, {
            check_out: now,
            hours_clocked: hoursClocked(now, checkedInToday[0].check_in)
        }, { new: true });
        console.log(checkOut)
        res.status(200).json(
            checkOut
        );
    } else {
        const checkIn = await Attendance.create({
            mid: member._id,
            check_in: now
        })

        res.status(200).json(
            checkIn
        )
    }
});

const getSwipeDetails = asyncHandler(async (req, res) => {

    const member = await Member.findOne({ mid: req.user.id });
    const checkedInToday = await Attendance.find({
        mid: member._id,
        check_in: { $gte: new Date().setHours(0, 0, 0, 0) }
    })

    if (checkedInToday) {
        res.status(200).json(checkedInToday);
    } else {
        res.status(200).json({})
    }

});


const getAttendanceDetails = asyncHandler(async (req, res) => {
    const member = await Member.findOne({ mid: req.user.id });

    const { date } = req.params;
    let startDate = moment(new Date(date)).startOf('month')
    let endDate = moment(startDate).endOf('month');

    startDate = moment(startDate).format("YYYY-MM-DD")
    endDate = moment(endDate).format("YYYY-MM-DD")

    console.log(startDate, endDate)


    const givenYear = new Date(startDate).getFullYear();
    const givenMonth = new Date(startDate).getMonth();
    let datesInGivenMonth = getDaysInMonth(givenMonth, givenYear);

    const attendance = await Attendance
        .find(
            {
                mid: member._id,
                check_in: {
                    $gte: new Date(startDate).setHours(0, 0, 0, 0),
                    $lte: new Date(endDate).setHours(0, 0, 0, 0)
                }
            });

    const userJoinedOn = moment(req.user.joined_on).format("YYYY-MM-DD");

    function getUserStatusOn(date) {
        // check whether user checked in
        let checkedIn = attendance.filter(e => {
            let check_in = moment(e.check_in).format("YYYY-MM-DD");
            return moment(check_in).isSame(date)
        });

        // if checked in
        let userStatus = {};
        if (checkedIn.length > 0) {
            checkedIn = checkedIn[0];

            // check whether user checked out
            // if yes mark status as present --> p
            if (checkedIn.check_out !== undefined) {
                userStatus.status = 'p'
                userStatus.check_in = checkedIn.check_in
                userStatus.check_out = checkedIn.check_out
                userStatus.hours_clocked = checkedIn.hours_clocked

            } else {
                // check if the check_in date is today
                // if yes mark status as 'yet to checkout' --> yo
                // else mark status as 'regularize' --> r
                let check_in = moment(checkedIn.check_in).format("YYYY-MM-DD")
                if (moment(check_in).isSame(moment().format("YYYY-MM-DD"))) {
                    userStatus.status = 'yo'
                    userStatus.check_in = checkedIn.check_in
                } else {
                    userStatus.status = 'r'
                    userStatus.check_in = checkedIn.check_in

                }
            }
        }
        return userStatus;
    }

    let givenMonthAttendance = [];

    for (let i of datesInGivenMonth) {
        // console.log(`${givenYear}-${givenMonth}-${i}`)
        let currDate = moment(i).format("YYYY-MM-DD")

        // check whether currDate is lesser than joining date
        // if yes skip the loop
        if (moment(currDate).isBefore(userJoinedOn)) continue;

        // if current date is greater than today skip
        if (moment(currDate).isAfter(moment().format("YYYY-MM-DD"))) continue;

        // if currDate is not lesser than joining date continue
        let currDateAttendance = {};

        // get the status for the date
        const userStatus = getUserStatusOn(currDate);


        // setting current date
        currDateAttendance.date = moment(currDate).format("YYYY-MM-DD")

        // check whether user as checked in on currDate
        if (Object.keys(userStatus).length > 0) {
            currDateAttendance.extendedProps = userStatus


            // check whether currDate is equal to joining date
            // if yes add prop joined_on : true
            if (moment(currDate).isSame(userJoinedOn)) {
                currDateAttendance.extendedProps.joined_on = true;
            }
        }
        else {

            if (moment(currDate).isSame(moment().format("YYYY-MM-DD"))) {
                userStatus.status = 'yi' // yet to checkin
                currDateAttendance.extendedProps = userStatus
            } else {
                // absent
                userStatus.status = 'a' // a --> absent
                currDateAttendance.extendedProps = userStatus

            }


            if (moment(currDate).isSame(userJoinedOn)) {
                currDateAttendance.extendedProps.joined_on = true;

            }
        }




        givenMonthAttendance.push(currDateAttendance);
    }

    res.status(200).json(givenMonthAttendance);
})




module.exports = {
    swipe,
    getSwipeDetails,
    getAttendanceDetails
}