import React from 'react'
import { Route, Switch } from 'react-router'
import { Customers } from '../pages/Customers/Customers'
import { Dashboard } from '../pages/Dashboard'
// import { Employers } from '../pages/Employers/Employers'
import { Finance } from '../pages/Finance/Finance'
import { Purshases } from '../pages/Purchases/Purshases'
import CreateInvoice from '../pages/Sales/CreateInvoice'
// import Estimates from '../pages/Sales/Estimates'
import { InvManage } from '../pages/Sales/InvManage'
import { Sales } from '../pages/Sales/Sales'
import { Inventory } from '../pages/Inventory/Inventory'
// import ClientPayments from '../pages/Sales/ClientPayments'
import ManageClients from '../pages/Customers/ManageClients'
import ContactsList from '../pages/Customers/ContactsList'
import AddCustomer from '../pages/Customers/AddCustomer'
import Appointments from '../pages/Customers/Appointments'
import Products from '../pages/Inventory/Products'
import ManageRequisitions from '../pages/Inventory/ManageRequisitions'
// import ManageStocktakings from '../pages/Inventory/ManageStocktakings'
import Stores from '../pages/Inventory/Stores'
// import PriceLists from '../pages/Inventory/PriceLists'
import ReceiptsManage from '../pages/Purchases/ReceiptsManage'
import SuppliersManage from '../pages/Purchases/SuppliersManage'
import Expenses from '../pages/Finance/Expenses'
import Incomes from '../pages/Finance/Incomes'
// import EmployersManage from '../pages/Employers/EmployersManage'
// import RolesManage from '../pages/Employers/RolesManage'
// import AddRole from '../pages/Employers/AddRole'
// import AddEstimate from '../pages/Sales/AddEstimate'
// import AddStocktakings from '../pages/Inventory/AddStocktaking'
import SingleInvoice from '../pages/Sales/SingleInvoice'
import EditInvoice from '../pages/Sales/EditInvoice'
import AddProduct from '../pages/Inventory/AddProduct'
import EditProduct from '../pages/Inventory/EditProduct'
import AddAddRequisition from '../pages/Inventory/AddAddRequisition'
import RequisitionMiddleware from '../pages/Inventory/RequisitionMiddleware'
import AddOutRequisition from '../pages/Inventory/AddOutRequisition'
import EditCustomer from '../pages/Customers/EditCustomers'
import AddSupplier from '../pages/Purchases/AddSupplier'
import EditSupplier from '../pages/Purchases/EditSupplier'
import AddAppointment from '../pages/Customers/AddAppointment'
import EditAppointment from '../pages/Customers/EditAppointment'
import CreatePayment from '../pages/Sales/CreatePayment'
import CreatePurchaseInvoice from '../pages/Purchases/CreatePurchaseInvoice'
import EditPurchasesInvoice from '../pages/Purchases/EditPurchasesInvoice'
import CreateWarehouse from '../pages/Inventory/CreateWarehouse'
import EditPayment from '../pages/Sales/EditPayment'



export const Routes = () => {
    return (
        <Switch>
            <Route path="/app" exact component={Dashboard}/>
            <Route exact path="/app/owner/customers/" component={Customers}/>
            <Route exact path="/app/owner/customers/customer-management/" component={ManageClients}/>
            <Route exact path="/app/owner/customers/add" component={AddCustomer} />
            <Route exact path="/app/owner/customers/edit/:customerId" component={EditCustomer} />
            <Route exact path="/app/owner/customers/client-contacts/" component={ContactsList} />
            <Route exact path="/app/owner/customers/appointments/" component={Appointments} />
            <Route exact path="/app/owner/customers/appointments/add" component={AddAppointment} />
            <Route exact path="/app/owner/customers/appointments/edit/:appointmentId" component={EditAppointment} />

            <Route exact path="/app/owner/sales/" component={Sales}/>
            <Route exact path="/app/owner/sales/invoices-management/" component={InvManage}/>
            <Route exact path="/app/owner/sales/invoices/view/:invoiceId" component={SingleInvoice}/>
            <Route exact path="/app/owner/sales/create-invoice/" component={CreateInvoice}/>
            <Route exact path="/app/owner/sales/invoices/add-payment/:invoiceId" component={CreatePayment}  />
            <Route exact path="/app/owner/sales/invoices/edit-payment/:paymentId/invoice/:invoiceId" component={EditPayment}  />
            <Route exact path="/app/owner/sales/invoices/edit/:invoiceId" component={EditInvoice} />
            {/* <Route exact path="/app/owner/sales/estimates/" component={Estimates}/> */}
            {/* <Route exact path="/app/owner/sales/estimates/add/" component={AddEstimate}/> */}
            {/* <Route exact path="/app/owner/sales/client-payments/" component={ClientPayments} /> */}

            <Route exact path="/app/owner/inventory/" component={Inventory}/>
            <Route exact path="/app/owner/inventory/add" component={CreateWarehouse}/>
            <Route exact path="/app/owner/inventory/products/" component={Products} />
            <Route exact path="/app/owner/inventory/products/add" component={AddProduct} />
            <Route exact path="/app/owner/inventory/products/edit/:productId" component={EditProduct} />
            <Route exact path="/app/owner/inventory/requistions/" component={ManageRequisitions} />
            <Route exact path="/app/owner/inventory/requistions/choose" component={RequisitionMiddleware} />
            <Route exact path="/app/owner/inventory/requistions/add" component={AddAddRequisition} />
            <Route exact path="/app/owner/inventory/requistions/out" component={AddOutRequisition} />
            {/* <Route exact path="/app/owner/inventory/stocktakings/" component={ManageStocktakings} /> */}
            {/* <Route exact path="/app/owner/inventory/stocktakings/add/" component={AddStocktakings} /> */}
            <Route exact path="/app/owner/inventory/stores/" component={Stores} />
            {/* <Route exact path="/app/owner/inventory/price-lists/" component={PriceLists} /> */}

            <Route exact path="/app/owner/purchases" component={Purshases} />
            <Route exact path="/app/owner/purchases/receipts/" component={ReceiptsManage} />
            <Route exact path="/app/owner/purchases/receipts/add" component={CreatePurchaseInvoice} />
            <Route exact path="/app/owner/purchases/receipts/edit/:invoiceId" component={EditPurchasesInvoice} />
            <Route exact path="/app/owner/purchases/suppliers/" component={SuppliersManage} />
            <Route exact path="/app/owner/purchases/suppliers/add" component={AddSupplier} />
            <Route exact path="/app/owner/purchases/suppliers/edit/:supplierId" component={EditSupplier} />

            <Route exact path="/app/owner/finance/" component={Finance} />
            <Route exact path="/app/owner/finance/expenses/" component={Expenses} />
            <Route exact path="/app/owner/finance/incomes/" component={Incomes} />

            {/* <Route exact path="/app/owner/employers" component={Employers} />
            <Route exact path="/app/owner/employers/employers-list/" component={EmployersManage}/>
            <Route exact path="/app/owner/employers/roles/" component={RolesManage} />
            <Route exact path="/app/owner/employers/roles/add" component={AddRole} /> */}
        </Switch>
    )
}
