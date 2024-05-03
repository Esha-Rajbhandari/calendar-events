import useOutsideClick from "@/hooks/useOutsideClick";
import useUsersQuery from "@/hooks/useUsersQuery";
import InputField from "@/ui/Input";
import PopoverWrapper from "@/ui/Popover";

import React from "react";

interface TeamMemebrDropdownProps {
  field: any;
}

const TeamMemberDropdown = (props: TeamMemebrDropdownProps) => {
  const { field } = props;
  const popoverRef = React.useRef(null);

  const [usersList, setUsersList] = React.useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const { loading, error } = useUsersQuery({
    onSuccess: setUsersList,
  });

  useOutsideClick(popoverRef, () => setIsDropdownOpen(false));

  const handleChange = (opt: any) => {
    const updatedList = usersList.map((ulist: any) => {
      if (opt.value === ulist.value) {
        return { ...ulist, isChecked: !ulist.isChecked };
      }

      return ulist;
    });

    setUsersList(updatedList);
    field.onChange(updatedList.filter((item) => item.isChecked));
  };

  return (
    <div className="relative">
      <InputField
        placeholder={"Select participants"}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      />

      {isDropdownOpen && (
        <PopoverWrapper ref={popoverRef}>
          <ul className="bg-white p-2 rounded-sm border-2 border-solid border-gray-100">
            {usersList.map((option) => {
              return (
                <li key={option.value} onClick={() => handleChange(option)}>
                  <label className="flex whitespace-nowrap flex-row items-center  cursor-pointer  hover:bg-blue-100 ">
                    <InputField
                      disabled={loading || error}
                      type="checkbox"
                      checked={option.isChecked}
                      value={option.value}
                      className="cursor-pointer"
                    />
                    <span className="ml-1">{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </PopoverWrapper>
      )}
    </div>
  );
};

export default TeamMemberDropdown;
