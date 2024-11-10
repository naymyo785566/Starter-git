import React from 'react'
import  Container  from '../components/Container'
import ModuleBtn from '../components/ModuleBtn'
import { HiMiniCircleStack, HiChartBar, HiDocumentDuplicate } from "react-icons/hi2";

const DashboardPage = () => {
  return (
    <section>
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-5">
                <div className="col-span-1 row-span-1">
                <ModuleBtn name={"Product Module"} icon={<HiMiniCircleStack  className='size-14'/>} url={"/product"}/>
                </div>
                <div className="col-span-1 row-span-1">
                <ModuleBtn name={"Sale Module"} icon={<HiChartBar className='size-14' />} url={"/sale"}/>
                </div>
                <div className="col-span-1 row-span-1">
                <ModuleBtn name={"Voucher Module"} icon={<HiDocumentDuplicate className='size-14' />} url={"/vouncher"}/>
                </div>
            </div>
        </Container>
    </section>
  )
}

export default DashboardPage