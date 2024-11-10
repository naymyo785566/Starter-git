import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumbs'
import VoucherCard from '../components/VoucherCard'

const VouncherDetailPage = () => {
  return (
    <section>
    <Container>
        <Breadcrumb currentPageTitle={"Voucher Detail"} links={[{title: "Voucher Module", path: "/vouncher"}]}/>
        <VoucherCard/>
        
    </Container>
</section>
  )
}

export default VouncherDetailPage