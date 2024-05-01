import React from "react";
import moment from "moment-timezone";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

import { Form, FormControl, FormField, FormItem } from "@/shadcn/ui/form";
import Dropdown from "@/ui/Select";

interface TimeZoneProps {
  timezone: string;
  className?: string;
  setTimezone: Dispatch<SetStateAction<string>>;
}

const TimeZone = (props: TimeZoneProps) => {
  const { setTimezone, timezone, className } = props;

  const timeZones = moment.tz.names();

  const form = useForm();

  const getTimeZoneList = React.useCallback(
    () =>
      timeZones.map((tz) => ({
        label: tz,
        value: tz,
      })),
    []
  );

  const handleChange = (value: string) => {
    setTimezone(value);
  };

  return (
    <div className={className}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="timezone"
          render={() => (
            <FormItem>
              <FormControl>
                <Dropdown
                  itemLabel={"Timezones"}
                  defaultValue={timezone}
                  handleChange={handleChange}
                  dropdownItems={getTimeZoneList()}
                  dropdownPlaceholder={"Select timezone"}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default TimeZone;
