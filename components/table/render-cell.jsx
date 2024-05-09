import {
  Tooltip,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
import React, { useState, Fragment } from 'react';
import { DeleteIcon } from '../icons/table/delete-icon';
import { EditIcon } from '../icons/table/edit-icon';
import { productModel } from '../products/Products';
import { TableWrapper as Table } from './table';
import _ from 'lodash';
import {
  APPLE_TYPES,
  JUICE_TYPES,
  MEASUREMENT_TYPES,
  PACKAGIN_TYPES,
  PRODUCT_TYPES,
  STATUSES,
  VINEGAR_TYPES,
} from '../../constants';

export const RenderCell = ({
  data,
  rowData,
  type,
  column,
  onUpdate,
  onDelete,
}) => {
  const getWidthStyles = () => ({
    maxWidth: column?.width || 'unset',
    minWidth: column?.width || 'unset',
  });

  switch (type) {
    case 'boolean':
      return data ? 'true' : 'false';
    case 'actions':
      return (
        <div className="flex items-center gap-4 ">
          {onUpdate && (
            <Tooltip content="Редагувати" color="secondary">
              <button onClick={() => onUpdate(rowData)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip content="Видалити" color="danger">
              <button onClick={() => onDelete(rowData.id)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          )}
        </div>
      );
    case 'price':
      return (
        <div style={getWidthStyles()}>
          {rowData.amount} {rowData.currency}
        </div>
      );
    case 'delivery':
      return (
        <div className="flex flex-col gap-2" style={getWidthStyles()}>
          <span>
            {rowData?.type_delivery === 'MAIL' ? 'Нова пошта' : 'Укр пошта'}
          </span>
          <span>
            {
              rowData?.type_delivery === 'MAIL' ? 
                `${rowData?.delivery_description?.warehouseTypeDescription} №${rowData?.delivery_description?.number}, адреса - ${rowData?.delivery_description?.nameUkr}` :
                rowData?.type_delivery === 'UKRMAIL' ?
                `${rowData?.delivery_description?.TYPE_LONG} - ${rowData?.delivery_description?.POSTTERMINAL} (${rowData?.delivery_description?.POSTCODE}), 
                 адреса - ${rowData?.delivery_description?.PDCITY_UA}, ${rowData?.delivery_description?.ADDRESS}` :
                  '---'
            }
          </span>
        </div>
      );
    case 'list':
      return <DetailsModal data={rowData} rowStyle={getWidthStyles()} />;
    case 'listProduct':
      return (
        <div className='flex flex-col' style={getWidthStyles()}>
          {
            rowData.catalog_list_id.map(({id, count, model_catalog}) => {
              return (
                <div key={id} style={getWidthStyles()}>
                  <span>{model_catalog.header}, {count}шт</span>
                </div>
              )
            })
          }
        </div>
      );
    case 'company':
      return (
        <div className="flex flex-col gap-2" style={getWidthStyles()}>
          <span>{rowData.name_company}</span>
          <span>{rowData.code_company}</span>
        </div>
      );
    case 'bank':
      return (
        <div className="flex flex-col gap-2" style={getWidthStyles()}>
          <span>{rowData.name_bank}</span>
          <span>{rowData.number_bank}</span>
        </div>
      );
    case 'full_address':
      const f_address = [rowData.region, rowData.settlement, rowData.address]
        .filter((el) => !!el)
        .join(', ');
      return (
        <div
          title={f_address}
          className="line-clamp-3"
          style={getWidthStyles()}
        >
          {f_address}
        </div>
      );
    case 'user':
      return (
        <div className="flex flex-col gap-2">
          <span>{rowData.full_name}</span>
          <span>{rowData.email}</span>
          <span>{rowData.number}</span>
        </div>
      );
    case 'picture':
      return (
        <div style={getWidthStyles()}>
          <Image
            src={data}
            alt="picture"
            width={column.width || 150}
            height={column.width || 150}
            style={{ objectFit: 'contain ' }}
          />
        </div>
      );
    case 'long-text':
      return (
        <div title={data} className="line-clamp-3" style={getWidthStyles()}>
          {data}
        </div>
      );

    case 'custom':
      return column.render(rowData);
    case 'data':
      const date = new Date(data * 1000);
      return (
        <div className="line-clamp-1 flex" style={getWidthStyles()}>
          {date.toLocaleDateString()}
        </div>
      );
    case 'length':
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data} см
        </div>
      );
    case 'width':
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data} см
        </div>
      );
    case 'height':
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data} см
        </div>
      );
    case 'weight':
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data} кг
        </div>
      );
    case 'delivery_payment':
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data} грн
        </div>
      );
    
    case 'text':
      switch (column.uid) {
        case 'type_measurement':
          return (
            MEASUREMENT_TYPES.find(({ value }) => value === data)?.label || ''
          );

        case 'type_product':
          return PRODUCT_TYPES.find(({ value }) => value === data)?.label || '';

        case 'type_apple':
          return APPLE_TYPES.find(({ value }) => value === data)?.label || '';

        case 'type_juice':
          return JUICE_TYPES.find(({ value }) => value === data)?.label || '';

        case 'type_vinegar':
          return VINEGAR_TYPES.find(({ value }) => value === data)?.label || '';
        case 'type_packaging':
          return (
            PACKAGIN_TYPES.find(({ value }) => value === data)?.label || ''
          );
        case 'status':
          return STATUSES.find(({ value }) => value === data)?.label || '';
      }
    default:
      return (
        <div className="line-clamp-1" style={getWidthStyles()}>
          {data}
        </div>
      );
  }
};

const DetailsModal = ({ data, rowStyle }) => {
  const [open, setOpen] = useState(false);
  const table_data = data.catalog_list_id.map((item) => ({
    ...item.model_catalog,
    measurement:
      item.model_catalog.measurement +
      ' ' +
      item.model_catalog.type_measurement,

    count: item.count,
  }));
  let model = _.cloneDeep(productModel);
  model = [
    ...model.slice(0, 2),
    { name: 'Кількість', uid: 'count', type: 'text' },
    ...model.slice(2),
  ];
  // console.log(table_data);
  return (
    <>
      <span
        className="underline font-bold cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Cписок
      </span>
      <Modal size="5xl" isOpen={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Список товарів
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2" style={rowStyle}>
              <Table data={table_data} columns={model} />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
