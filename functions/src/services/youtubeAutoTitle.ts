import { AuthInfo, AutoTitleSettings } from "../ts/types";

async function start(settings: AutoTitleSettings, authInfo: AuthInfo) {
  console.log(settings, authInfo);
}

export default { start };
