import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const posts = [...Array(52)].map(() => ({
  post_id: faker.number.int(),
  verified: sample(['verified', 'waiting', 'denied']),
  order_status: sample(['waiting', 'delivering', 'done', 'refund', 'return', 'cancel']),
  seller_name: faker.person.fullName(),
  phone_number: faker.phone.number(),
  email: faker.internet.email(),
  street: faker.location.street(),
  ward: faker.location.street(),
  district: faker.location.street(),
  province: faker.location.state(),
  name: sample([
    'Casio MTP-1374D-1AVDF Nam Quartz',
    'Casio AE-1200WHD-1AVDF Nam Quartz',
    'Casio MTP-VT01L-1BUDF Nam Quartz',
    'Casio G-SHOCK GA-110-1ADR Nam Quartz',
    'Pierre Lannier 255F466 Nam Quartz',
    'Pierre Lannier 023L928 Nữ Quartz',
    'Pierre Lannier 381D138 Nam Quartz',
    'Pierre Lannier 040J608 Nữ Quartz',
    'Casio G-SHOCK GA-110AC-7ADR Nam Quartz',
    'Casio G-SHOCK GA-400-4ADR Nam Quartz',
  ]),
  price: faker.number.int({ min: 300000, max: 5000000 }),
  case_size: faker.number.int(),
  status: sample(['old', 'new']),
  date: faker.date.recent({ days: 10, refDate: '2024-05-28T00:00:00.000Z' }),
  // media: [...Array(6)].map((_, hello) =>({
  //   content: `/assets/images/avatars/avatar_${hello + 1}.jpg`,
  //   product_index: hello+1,
  // })),
  count: faker.number.int(),
  date_ago: sample(['9 tháng trước']),
  formatted_price: faker.number.int({ min: 300000, max: 5000000 }),
  case_size_num: faker.number.int(),
  description: faker.lorem.sentences(),
  brand: sample(['Casio', 'Citizen', 'Seiko', 'Orient']),
  strap_material: sample(['Da', 'Kim loại', 'Khác']),
  battery_life: faker.number.int(),
  waterproof: sample(['Có', 'Không']),
  waterproof_num: faker.datatype.boolean(),
  gender: sample(['Nam', 'Nữ']),
  seller_id: faker.number.int(),
  media: [
    {
      content: sample([
        'https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg',
        'https://media.shopdongho.com/2021/05/hinh-anh-AE-1200WHD-1AVDF-new-2.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-1374d-1avdf.jpg',
        'https://media.shopdongho.com/2008/01/casio-edifice-EFR-526L-1AVUDF.jpg',
        'https://media.shopdongho.com/2018/09/dong-ho-casio-efr-526l-7avudf-nam-pin-day-da-a-1.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-v300g-7audf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-1375l-7avdf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-v300l-1audf.jpg',
        'https://media.shopdongho.com/2023/02/dong-ho-casio-LTP-V004GL-7AUDF-1-768x896.png',
        'https://media.shopdongho.com/2019/07/Casio-LTP-VT01L-1BUDF.jpg',
      ]),
      product_index: 1,
    },
    {
      content: sample([
        'https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg',
        'https://media.shopdongho.com/2021/05/hinh-anh-AE-1200WHD-1AVDF-new-2.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-1374d-1avdf.jpg',
        'https://media.shopdongho.com/2008/01/casio-edifice-EFR-526L-1AVUDF.jpg',
        'https://media.shopdongho.com/2018/09/dong-ho-casio-efr-526l-7avudf-nam-pin-day-da-a-1.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-v300g-7audf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-1375l-7avdf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-v300l-1audf.jpg',
        'https://media.shopdongho.com/2023/02/dong-ho-casio-LTP-V004GL-7AUDF-1-768x896.png',
        'https://media.shopdongho.com/2019/07/Casio-LTP-VT01L-1BUDF.jpg',
      ]),
      product_index: 1,
    },
    {
      content: sample([
        'https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg',
        'https://media.shopdongho.com/2021/05/hinh-anh-AE-1200WHD-1AVDF-new-2.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-1374d-1avdf.jpg',
        'https://media.shopdongho.com/2008/01/casio-edifice-EFR-526L-1AVUDF.jpg',
        'https://media.shopdongho.com/2018/09/dong-ho-casio-efr-526l-7avudf-nam-pin-day-da-a-1.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-v300g-7audf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-1375l-7avdf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-v300l-1audf.jpg',
        'https://media.shopdongho.com/2023/02/dong-ho-casio-LTP-V004GL-7AUDF-1-768x896.png',
        'https://media.shopdongho.com/2019/07/Casio-LTP-VT01L-1BUDF.jpg',
      ]),
      product_index: 1,
    },
    {
      content: sample([
        'https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg',
        'https://media.shopdongho.com/2021/05/hinh-anh-AE-1200WHD-1AVDF-new-2.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-1374d-1avdf.jpg',
        'https://media.shopdongho.com/2008/01/casio-edifice-EFR-526L-1AVUDF.jpg',
        'https://media.shopdongho.com/2018/09/dong-ho-casio-efr-526l-7avudf-nam-pin-day-da-a-1.jpg',
        'https://media.shopdongho.com/2018/09/casio-mtp-v300g-7audf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-1375l-7avdf.jpg',
        'https://media.shopdongho.com/2018/06/casio-mtp-v300l-1audf.jpg',
        'https://media.shopdongho.com/2023/02/dong-ho-casio-LTP-V004GL-7AUDF-1-768x896.png',
        'https://media.shopdongho.com/2019/07/Casio-LTP-VT01L-1BUDF.jpg',
      ]),
      product_index: 1,
    },
  ],
}));
