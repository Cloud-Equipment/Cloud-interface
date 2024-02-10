import { getQueryKeys } from '@cloud-equipment/api';

const namespace = 'appointments';

export default {
  ...getQueryKeys(namespace),
};
