import { useRef, useCallback, useState } from 'react';
import { getOrders } from '../../api';
import useTableAPIRequest from '../hooks/useTableAPIRequest';
import { Select, SelectItem } from '@nextui-org/select';

import { utils, writeFileXLSX } from 'xlsx';
import { Button } from '@nextui-org/react';
import { TableWrapper } from '../table/table';

import { STATUSES } from '../../constants';

import Datepicker from "react-tailwindcss-datepicker"; 
import DemoComponent from '../datepicker/datepicker';

export const Reports = () => {
  const { isFetch, data, params, setParams } = useTableAPIRequest(getOrders, {
    status: '',
    limit: null
  });

  const [fData, setFData] = useState([]);

  const { value, handleValueChange } = DemoComponent();

  /* reference to the table element */
  const tbl = useRef();
  /* Callback invoked when the button is clicked */
  const xport = useCallback(() => {
    /* Create worksheet from HTML DOM TABLE */
    const wb = utils.table_to_book(tbl.current);
    // eslint-disable-next-line

    /* Export to file (start a download) */
    writeFileXLSX(wb, "SheetJSTable.xlsx");
  });

  const updateData = (newValue) => {
    handleValueChange(newValue)

    const newData = data.filter(item => {
      return new Date(item.createdAt * 1000).toLocaleDateString('sv-SE') >= newValue.startDate;
    });

    setFData(newData)
  }

  return ( 
    <div className=" w-full flex flex-col gap-4">
      {!isFetch && (
        <>
          <div className="flex items-center justify-between">
            <div className='flex gap-5'>
              <div style={{ width: 300, marginLeft: 'auto' }}>
                <p>Select date to filter</p>
                <Datepicker 
                  value={value} 
                  onChange={updateData} 
                  showShortcuts={true} 
                  displayFormat={"DD/MM/YYYY"}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <TableWrapper
              propRef={tbl}
              columns={orderTable}
              data={fData}
            />
          </div>
          <div className="flex items-center justify-start">
            <Button 
              disabled={!fData.length} 
              onClick={xport} 
              color={fData.length ? "success" : "danger"}>Export XLSX!</Button>
          </div>
        </>
      )}

      {isFetch && <div>Завантаження...</div>}
    </div> 
  );
};

const orderTable = [
  { name: 'Дата', uid: 'createdAt', type: 'data' },
  { name: 'Замовлення №', uid: 'id', type: 'number' },
  { name: 'Товар', uid: 'list', type: 'listProduct' },
  { name: 'Замовник', uid: 'full_name', type: 'text' },
  { name: 'Статус', uid: 'status', type: 'text' },
  { name: 'Загальна сума', uid: 'price', type: 'price', width: '100px' },
  // { name: 'Вартість доставки', uid: 'delivery_price', type: 'price', width: '100px' },
  { name: 'Номер ТТН', uid: 'ttn', type: 'text', width: '150px' },
  { name: 'ID Чека', uid: 'order_id', type: 'text', width: '300px' }
];
