import React from "react";
import InputField from "./Input";
import PopoverWrapper from "./Popover";
import { Calendar } from "@/shadcn/ui/calendar";
import useOutsideClick from "@/hooks/useOutsideClick";
import { DateRange } from "react-day-picker";
import { getDateRangeString } from "@/utils";

interface DatePickerProps {
  field: any;
  placeholder?: string;
}

const DatePicker = (props: DatePickerProps) => {
  const { field, placeholder } = props;
  const popoverRef = React.useRef(null);
  const [selectedDate, setSelectedDate] = React.useState<
    DateRange | undefined
  >();
  const [isCalendarPopupOpen, setIsCalendarPopupOpen] = React.useState(false);

  useOutsideClick(popoverRef, () => setIsCalendarPopupOpen(false));

  const handleDateRangeSelection = (dateRange?: DateRange) => {
    setSelectedDate(dateRange);

    if (dateRange?.from && dateRange.to) {
      setIsCalendarPopupOpen(false);
      field.onChange(dateRange);
    }
  };

  return (
    <div className="relative">
      <InputField
        {...field}
        placeholder={placeholder}
        value={getDateRangeString(field.value)}
        onClick={() => setIsCalendarPopupOpen(!isCalendarPopupOpen)}
      />

      {isCalendarPopupOpen && (
        <PopoverWrapper ref={popoverRef}>
          <Calendar
            mode="range"
            selected={selectedDate}
            className="rounded-md border bg-white"
            onSelect={(dateRange) => handleDateRangeSelection(dateRange)}
          />
        </PopoverWrapper>
      )}
    </div>
  );
};

export default DatePicker;
