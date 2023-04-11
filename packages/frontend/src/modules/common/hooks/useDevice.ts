import { useState } from 'react';
import { BREAKPOINTS } from '../consts/breakpoints.const';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const calcDeviceType = (): DeviceType => {
  const maxMobileWidth = BREAKPOINTS.MOBILE;
  const maxTabletWidth = BREAKPOINTS.TABLET;
  return window.innerWidth <= maxMobileWidth
    ? 'mobile'
    : window.innerWidth <= maxTabletWidth
    ? 'tablet'
    : 'desktop';
};

export const useDevice = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>(calcDeviceType());

  window.addEventListener('resize', () => {
    setDevice(calcDeviceType());
  });

  return device;
};
