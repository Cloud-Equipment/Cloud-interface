import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import { IAppState } from '../../Store/store';
import queries from '../../services/queries/appointments';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
// import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
// import { Badge, Tooltip } from '@mui/material';
// import { IAppointment } from '../../services/queries/appointments/types';

const DashboardCalendar = ({
  date,
  onDateChange,
}: {
  date: Dayjs;
  onDateChange: (value: Dayjs) => void;
}) => {
  // const userDetails = useSelector((state: IAppState) => state.auth.user);
  // const [firstDay, setFirstDay] = useState(
  //   dayjs().startOf('month').format('YYYY-MM-DD')
  // );
  // const [lastDay, setLastDay] = useState(
  //   dayjs().endOf('month').format('YYYY-MM-DD')
  // );

  // const { isLoading, data } = queries.useGetCalendarAppointments(
  //   `/facility-manager/facility/getfacilityappointmentdayily?facilityId=${userDetails?.FACILITY_ID}&startDate=${firstDay}&endDate=${lastDay}&currentPage=1&startIndex=0&pageSize=100`
  // );

  // const handleMonthChange = (view: Dayjs) => {
  //   setFirstDay(dayjs(view).startOf('month').format('YYYY-MM-DD'));
  //   setLastDay(dayjs(view).endOf('month').format('YYYY-MM-DD'));
  // };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          // onYearChange={() => {}}
          // onMonthChange={handleMonthChange}
          value={date}
          onChange={(x) => {
            onDateChange(x);
          }}
          // slots={{
          //   day: CustomDayRendered,
          // }}
          // slotProps={{
          //   day: {
          //     highlightedDays: data?.highlightedDays,
          //     data: data?._data,
          //   } as any,
          // }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DashboardCalendar;

// function CustomDayRendered(
//   props: PickersDayProps<Dayjs> & {
//     highlightedDays?: number[];
//     data?: IAppointment[];
//   }
// ) {
//   const {
//     data,
//     highlightedDays = [],
//     day,
//     outsideCurrentMonth,
//     ...other
//   } = props;

//   const isSelected =
//     !props.outsideCurrentMonth &&
//     highlightedDays.indexOf(props.day.date()) >= 0;

//   return (
//     <Tooltip
//       title={
//         isSelected ? (
//           <AppointmentDetails appointments={data ?? []} />
//         ) : undefined
//       }
//       arrow
//     >
//       <Badge
//         key={props.day.toString()}
//         overlap="circular"
//         color="primary"
//         badgeContent={isSelected ? ' ' : undefined}
//       >
//         <PickersDay
//           {...other}
//           outsideCurrentMonth={outsideCurrentMonth}
//           day={day}
//         />
//       </Badge>
//     </Tooltip>
//   );
// }

// const AppointmentDetails = ({
//   appointments,
// }: {
//   appointments: IAppointment[];
// }) => {
//   return (
//     <div className="grid gap-2 divide-y">
//       {appointments.map((item) => (
//         <div className="p-2">
//           <p>{item?.patient?.patientName} </p>
//           <p>{dayjs(item.appointmentDate).format('h:mm A')} </p>
//         </div>
//       ))}
//     </div>
//   );
// };
