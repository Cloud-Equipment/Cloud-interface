import { getQueryKeys } from '@cloud-equipment/api';

const namespace = 'patients';

export default {
  ...getQueryKeys(namespace),
};
