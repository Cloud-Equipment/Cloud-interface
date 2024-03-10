import { getQueryKeys } from '@cloud-equipment/api';

const namespace = 'referers';

export default {
  ...getQueryKeys(namespace),
};
