import { DataDriveConfig } from '@ioc:DataDrive';

const dataDriveConfig: DataDriveConfig = {
  drives: {
    local: {
      // Disk refers to an existing disk in Drive's config.
      disk: 'local',
      // All files will be placed in a location under the prefix.
      // prefix must contain two parts separated by a slash.
      prefix: 'my/prefix',
    },
  },
};

export default dataDriveConfig;
