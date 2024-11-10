import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumbs'
import VoucherList from '../components/VoucherList'

const VouncherPage = () => {
  return (
    <section>
        <Container>
            <Breadcrumb currentPageTitle={"Voucher Module"}/>
            <VoucherList/>
        </Container>
    </section>
  )
}

export default VouncherPage