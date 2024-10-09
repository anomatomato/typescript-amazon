import dayjs, { Dayjs } from 'dayjs';
import { DeliveryOption, DeliveryOptionId } from '../types';

export const deliveryOptions: DeliveryOption[] = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export const validDeliveryOptionIds: DeliveryOptionId[] = ['1', '2', '3']

export function getDeliveryOption(deliveryOptionId: DeliveryOptionId): DeliveryOption {
  const deliveryOption = deliveryOptions.find((option) => option.id === deliveryOptionId);

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption: DeliveryOption): string {
  let deliveryDate: Dayjs = dayjs();
  let remainingDays: number = deliveryOption.deliveryDays;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    if (!isWeekend(deliveryDate)) remainingDays--;
  }

  const dateString: string = deliveryDate.format('dddd, MMMM D');

  return dateString;
}

function isWeekend(date: Dayjs): boolean {
  const dayOfWeek: string = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}