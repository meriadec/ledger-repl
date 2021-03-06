// @flow
import { from } from "rxjs";
import { concatMap } from "rxjs/operators";
import editDeviceName from "@ledgerhq/live-common/lib/hw/editDeviceName";
import getDeviceName from "@ledgerhq/live-common/lib/hw/getDeviceName";
import getDeviceInfo from "@ledgerhq/live-common/lib/hw/getDeviceInfo";
import getAddress from "@ledgerhq/live-common/lib/hw/getAddress";
import getAppAndVersion from "@ledgerhq/live-common/lib/hw/getAppAndVersion";
import genuineCheck from "@ledgerhq/live-common/lib/hw/genuineCheck";
import installApp from "@ledgerhq/live-common/lib/hw/installApp";
import uninstallApp from "@ledgerhq/live-common/lib/hw/uninstallApp";
import installFinalFirmware from "@ledgerhq/live-common/lib/hw/installFinalFirmware";
import debugAppInfosForCurrency from "@ledgerhq/live-common/lib/hw/debugAppInfosForCurrency";
import { cmd } from "./helpers/commands";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/lib/currencies";
import type { Command } from "./helpers/commands";

const bitcoinCurrency = getCryptoCurrencyById("bitcoin");
const mapDeviceInfo = (args, { deviceInfo }) => [deviceInfo, ...args];
const mapTargetId = (args, { deviceInfo }) => [deviceInfo.targetId, ...args];

export const commands: Command[] = [
  {
    id: "getDeviceInfo",
    exec: getDeviceInfo,
    form: []
  },

  {
    id: "getAppAndVersion",
    exec: getAppAndVersion,
    form: []
  },

  {
    id: "genuineCheck",
    exec: genuineCheck,
    mapArgs: mapDeviceInfo,
    dependencies: {
      deviceInfo: getDeviceInfo
    },
    form: []
  },

  { id: "installFinalFirmware", exec: installFinalFirmware, form: [] },

  {
    id: "installApp",
    exec: installApp,
    mapArgs: mapTargetId,
    dependencies: {
      deviceInfo: getDeviceInfo
    },
    form: [
      {
        type: "application"
      }
    ]
  },

  {
    id: "uninstallApp",
    exec: uninstallApp,
    mapArgs: mapTargetId,
    dependencies: {
      deviceInfo: getDeviceInfo
    },
    form: [
      {
        type: "application"
      }
    ]
  },

  {
    id: "getDeviceName",
    exec: getDeviceName,
    form: []
  },

  {
    id: "editDeviceName",
    exec: editDeviceName,
    form: [
      {
        type: "ascii",
        default: "",
        maxlength: 32
      }
    ]
  },

  {
    id: "debugAppInfosForCurrency",
    exec: debugAppInfosForCurrency,
    form: [{ type: "cryptocurrency", default: bitcoinCurrency }]
  },

  {
    id: "getAddress",
    exec: getAddress,
    form: [
      { type: "cryptocurrency", default: bitcoinCurrency },
      { type: "derivationPath", default: "44'/0'/0'/0/0" },
      { type: "checkbox", label: "Verify" }
    ]
  }
];
