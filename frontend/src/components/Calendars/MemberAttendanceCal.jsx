import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins

import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { MdDone, MdEventAvailable, MdEventBusy } from 'react-icons/md'
import { getAttendance } from '../../features/swipe/swipeSlice'
import moment from 'moment';

const MemberAttendanceCal = () => {

    let calRef = React.createRef();


    const {
        swipeData,
        attendanceData,
        isGetAttendancePending,
        isGetAttendanceRejected,
        isGetAttendanceErrorMsg
    } = useSelector((store) => store.swipe);

    const dispatch = useDispatch();

    let getAttendanceFor = moment().format("YYYY-MM-DD").toString()
    const [initialDate, setInitialDate] = useState(getAttendanceFor)

    useEffect(() => {

        dispatch(getAttendance(getAttendanceFor));
    }, [swipeData])


    if (isGetAttendanceRejected) {
        return (<>
            <div className="notification is-danger is-light">
                {isGetAttendanceErrorMsg}
            </div>
        </>)
    }

    if (isGetAttendancePending) {
        return (<>
            <h1>Loading...</h1>
        </>)
    }

    return (
        <div className="container">
            <FullCalendar
                ref={calRef}
                contentHeight={500}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                eventContent={renderEventContent}
                showNonCurrentDates={false}
                fixedWeekCount={false}
                eventBackgroundColor="#ffffff"
                eventBorderColor='#ffffff'
                lazyFetching={true}
                initialDate={initialDate}
                customButtons={{
                    prevMonth: {
                        text: '',
                        icon: 'chevron-left',
                        click: function () {
                            let calendarApi = calRef.current.getApi()
                            calendarApi.prev()
                            let getAttendanceFor = calendarApi.getDate()
                            dispatch(getAttendance(moment(getAttendanceFor).format("YYYY-MM-DD").toString()))
                            setInitialDate(getAttendanceFor)

                        },
                    },
                    nextMonth: {
                        text: '',
                        icon: 'chevron-right',
                        click: function () {
                            let calendarApi = calRef.current.getApi()
                            calendarApi.next()
                            let getAttendanceFor = calendarApi.getDate()
                            dispatch(getAttendance(moment(getAttendanceFor).format("YYYY-MM-DD").toString()))
                            setInitialDate(getAttendanceFor)
                        },
                    },
                }}
                headerToolbar={{ start: 'title', end: 'prevMonth,nextMonth' }}
                events={
                    attendanceData
                }
            />

        </div>
    )
}

export default MemberAttendanceCal

function renderEventContent(eventInfo) {
    const { extendedProps } = eventInfo.event;
    const { status, hours_clocked, joined_on } = extendedProps;

    if (status === 'p') {
        return (<>
            <div className='has-background-success'><MdEventAvailable size={25} />{hours_clocked}</div>
            {joined_on ? (<div className='pl-2 has-background-link'>Joined on</div>) : ""}
        </>)
    }

    if (status === 'y') {
        return (<>
            <div className='has-background-info'><MdDone size={25} /><span>yet to swipe out</span></div>
            {joined_on ? (<div className='pl-2 has-background-link'>Joined on</div>) : ""}

        </>)
    }

    if (status === 'r') {
        return (<>
            <div className='has-background-warning has-text-link'><MdDone size={25} />regularize</div>
            {joined_on ? (<div className='pl-2 has-background-link'>Joined on</div>) : ""}

        </>)
    }

    if (status === 'a') {
        return (<>
            <div className='has-background-danger'><MdEventBusy size={25} className="my-0 py-0" />Absent</div>
            {joined_on ? (<div className='pl-2 has-background-link'>Joined on</div>) : ""}

        </>)

    }
}