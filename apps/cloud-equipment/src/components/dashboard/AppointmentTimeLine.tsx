import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import * as Assets from '@cloud-equipment/assets';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { BallTriangle } from 'react-loader-spinner';

const AppointmentTimeLine = ({
  data,
  date,
  loading = false,
}: {
  data?: any[];
  date: Dayjs;
  loading?: boolean;
}) => {
  return (
    <div className="border-t border-borderLine border-solid xl:min-h-[500px]">
      <h3 className="mt-4 pl-2 text-blackText">
        {dayjs().isSame(date, 'day') ? 'Upcoming Appointment' : 'Appointments'}
      </h3>

      {loading ? (
        <div
          style={{
            width: '100%',
            zIndex: 9999,
          }}
          className="grid place-items-center mt-10"
        >
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            // color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : data?.length ? (
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {data?.map((item, index) => (
            <TimelineItem key={index}>
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

                  <p className="mt-3 text-blackText">{item.medServiceName}</p>

                  <div className="flex items-center justify-between">
                    <p className="mt-1 text-greyText">{item.patientName}</p>

                    <button className="btn-icon">
                      <img src={Assets.Icons.ArrowRight} alt="" />
                    </button>
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <div className="py-6">
          <p>No appointments for {dayjs(date).format('YYYY-MM-DD')}</p>
        </div>
      )}
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
