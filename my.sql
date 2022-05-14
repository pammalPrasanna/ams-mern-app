DELIMITER //
create trigger after_attendance_checkout 
after update on attendance for each row
BEGIN
IF (old.check_out <> NULL) THEN
	update attendance set
    old.hours_clocked = TIMESTAMPDIFF(HOUR,OLD.check_in,NEW.check_out)
    where a_id = old.a_id;
END IF; //
END;
DELIMITER ;