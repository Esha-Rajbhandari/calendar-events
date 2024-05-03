import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectTrigger,
} from "@/shadcn/ui/select";

interface DropdownProps {
  itemLabel?: string;
  disabled?: boolean;
  defaultValue: string;
  dropdownPlaceholder: string;
  handleChange: (value: string) => void;
  dropdownItems: {
    label: string;
    value: string;
  }[];
}

const Dropdown = (props: DropdownProps) => {
  const {
    itemLabel,
    defaultValue,
    handleChange,
    disabled = false,
    dropdownItems,
    dropdownPlaceholder,
  } = props;

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]" disabled={disabled}>
        <SelectValue placeholder={dropdownPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {itemLabel && <SelectLabel>{itemLabel}</SelectLabel>}
          {dropdownItems.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
