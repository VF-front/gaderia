import React from 'react';
import { Sidebar } from './sidebar.styles';
import { Image } from '@nextui-org/react';
// import { CompaniesDropdown } from './companies-dropdown';
// import { HomeIcon } from '../icons/sidebar/home-icon';
import { PaymentsIcon } from '../icons/sidebar/payments-icon';
// import { BalanceIcon } from '../icons/sidebar/balance-icon';
import { AccountsIcon } from '../icons/sidebar/accounts-icon';
import { CustomersIcon } from '../icons/sidebar/customers-icon';
import { ProductsIcon } from '../icons/sidebar/products-icon';
// import { ReportsIcon } from '../icons/sidebar/reports-icon';
// import { DevIcon } from '../icons/sidebar/dev-icon';
// import { ViewIcon } from '../icons/sidebar/view-icon';
// import { SettingsIcon } from '../icons/sidebar/settings-icon';
// import { CollapseItems } from './collapse-items';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
// import { FilterIcon } from '../icons/sidebar/filter-icon';
import { useSidebarContext } from '../layout/layout-context';
// import { ChangeLogIcon } from '../icons/sidebar/changelog-icon';
import { useRouter } from 'next/router';
import { ReportsIcon } from '../icons/sidebar/reports-icon';

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={`${Sidebar({
          collapsed: collapsed,
        })} pt-4`}
      >
        <div className={Sidebar.Header()}>
          {/* <CompaniesDropdown /> */}
          <Image src="/logo.png" width={300} height={40} alt="Gaderia" />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {/* <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={router.pathname === '/'}
              href="/"
            /> */}
            <SidebarMenu title="Меню">
              {/* <SidebarItem
                isActive={router.pathname === '/accounts'}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              <SidebarItem
                isActive={router.pathname === '/payments'}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={['Banks Accounts', 'Credit Cards', 'Loans']}
                title="Balances"
              />
               */}
              {/* <SidebarItem
                isActive={router.pathname === '/customers'}
                title="Customers"
                icon={<CustomersIcon />}
              /> */}
              <SidebarItem
                isActive={router.pathname === '/products'}
                title="Продукти"
                icon={<ProductsIcon />}
                href="products"
              />
              <SidebarItem
                isActive={router.pathname === '/contacts'}
                title="Зворотний зв'язок"
                icon={<CustomersIcon />}
                href="contacts"
              />
              <SidebarItem
                isActive={router.pathname === '/orders'}
                title="Замовлення"
                icon={<PaymentsIcon />}
                href="orders"
              />
              <SidebarItem
                isActive={router.pathname === '/users'}
                title="Користувачі"
                icon={<AccountsIcon />}
                href="users"
              />
              <SidebarItem
                isActive={router.pathname === '/report'}
                title="Report"
                icon={<ReportsIcon />}
                href="reports"
              />
            </SidebarMenu>

            {/* <SidebarMenu title="General">
              <SidebarItem
                isActive={router.pathname === '/developers'}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={router.pathname === '/view'}
                title="View Test Data"
                icon={<ViewIcon />}
              />
              <SidebarItem
                isActive={router.pathname === '/settings'}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={router.pathname === '/changelog'}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu> */}
          </div>
          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={'Settings'} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Adjustments'} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={'Profile'} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div> */}
        </div>
      </div>
    </aside>
  );
};
