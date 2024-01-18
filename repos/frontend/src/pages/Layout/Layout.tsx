import { Outlet } from "react-router-dom"

const LayoutPage = () => {

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  )

}


export default LayoutPage