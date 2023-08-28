/* eslint-disable prettier/prettier */

import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { useSelector } from 'react-redux'
import RoomPage from 'src/screens/Room'

const AppContent = () => {
  const isExpert = useSelector((state) => state.login.isExpert)
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="room/:roomId" element={<RoomPage />} />
          <Route path="/" element={<Navigate to={isExpert ? "dashboard" : "userdashboard"} replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
