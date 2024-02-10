import { getQueryKeys } from '@cloud-equipment/api';

const namespace = 'medservices';

export default {
  ...getQueryKeys(namespace),
};
