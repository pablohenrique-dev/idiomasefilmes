import dayjs from "dayjs";

export function isNew(createdAt: Date): boolean {
  return dayjs(createdAt).isAfter(dayjs().subtract(10, "day"));
}
