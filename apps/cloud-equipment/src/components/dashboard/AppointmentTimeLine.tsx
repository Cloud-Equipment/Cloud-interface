import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import * as Assets from '@cloud-equipment/assets';
import moment from 'moment';
import { IAppointment } from '../../services/queries/appointments/types';

const AppointmentTimeLine = ({ data }: { data?: any[] }) => {
  return (
    <div className="border-t border-borderLine border-solid">
      <h3 className="mt-4 pl-2 text-blackText">Upcoming Appointment</h3>

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {data?.map((item) => (
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div>
                <p className="text-greyText">
                  {formatDate(item.appointmentDate)},{' '}
                  {moment(item.appointmentDate).format('h:mm A')}
                </p>

                <p className="mt-3 text-blackText">
                  {item.medServiceName}
                </p>

                <div className="flex items-center justify-between">
                  <p className="mt-1 text-greyText">
                    {item.patientName}
                  </p>

                  <button className="btn-icon">
                    <img src={Assets.Icons.ArrowRight} alt="" />
                  </button>
                </div>
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default AppointmentTimeLine;

function formatDate(date: string) {
  // Get today's date
  const today = moment().startOf('day');

  // Get yesterday's date
  const yesterday = moment().subtract(1, 'days').startOf('day');

  // Check if it's today
  if (moment(date).isSame(today, 'day')) {
    return 'Today';
  }
  // Check if it's yesterday
  else if (moment(date).isSame(yesterday, 'day')) {
    return 'Yesterday';
  }
  // Otherwise, return the formatted date
  else {
    return moment(date).format('YYYY-MM-DD');
  }
}
