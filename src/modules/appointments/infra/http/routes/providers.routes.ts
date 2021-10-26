import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controller/ProvidersController';
import ListDayAvailabilityController from '../controller/ListDayAvailabilityController';
import ListMonthAvailabilityController from '../controller/ListMonthAvailabilityController';
import { celebrate, Joi, Segments } from 'celebrate';

const providersRouter = Router();
const providersController = new ProvidersController();
const listMonthAvailabilityController = new ListMonthAvailabilityController();
const listDayAvailabilityController = new ListDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  listMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  listDayAvailabilityController.index,
);

export default providersRouter;
