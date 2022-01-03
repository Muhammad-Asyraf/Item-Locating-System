const { v4: uuidv4 } = require('uuid');
const Layout = require('../model');
const getLogger = require('../../../utils/logger');
const { removeFiles } = require('../../../utils/general');

const layoutLogger = getLogger(__filename, 'layout');

exports.AddLayout = async (req, res, next) => {
  try {
    const layoutId = uuidv4();
    const { name, label, layers_, store_uuid } = req.body;
    const { file: floorPlanFile } = req;
    const layers = JSON.parse(layers_);

    const layout = await Layout.query().insertGraph({
      uuid: layoutId,
      name,
      label,
      is_active: false,
      store_uuid,
      ...(floorPlanFile && { floor_plan_path: floorPlanFile.path }),
      layers,
    });

    layoutLogger.info(
      `layout successfully created with [UUID -${layout.uuid}]`
    );

    res.json(layout);
  } catch (err) {
    layoutLogger.warn(`Error adding new layout`);
    await removeFiles(req.file);
    next(err);
  }
};

exports.getLayouts = async (req, res, next) => {
  try {
    const { store_uuid } = req.params;
    const layouts = await Layout.query()
      .where('store_uuid', store_uuid)
      .withGraphFetched('[layers]')
      .modifyGraph('layers', (builder) => {
        builder.select('uuid', 'shape', 'layer_coordinate', 'meta_data');
      });

    layoutLogger.info(`Successfully retrieve: ${layouts.length} layouts`);

    res.json(layouts);
  } catch (err) {
    layoutLogger.warn(`Error retrieving all layouts`);
    next(err);
  }
};

exports.getLayout = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const layout = await Layout.query()
      .findById(uuid)
      .withGraphFetched('[layers]')
      .modifyGraph('layers', (builder) => {
        builder.select('uuid', 'shape', 'layer_coordinate', 'meta_data');
      });

    layoutLogger.info(`Successfully retrieve layout: ${layout.uuid}`);

    res.json(layout);
  } catch (err) {
    layoutLogger.warn(`Error retrieving layout`);
    next(err);
  }
};

exports.removeLayout = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await Layout.query().deleteById(uuid);
    const logMessage = `Successfully delete layout: ${uuid}`;
    layoutLogger.info(logMessage);

    res.json({ message: logMessage });
  } catch (err) {
    layoutLogger.warn(`Error deleting layout`);
    next(err);
  }
};

exports.removeMultipleLayout = async (req, res, next) => {
  try {
    const { listToDelete } = req.body;
    await Layout.query().delete().whereIn('uuid', listToDelete);

    const logMessage = `Successfully deleted following layouts: ${listToDelete}`;
    res.json({ message: logMessage });
  } catch (err) {
    layoutLogger.warn(`Error deleting layouts`);
    next(err);
  }
};

exports.UpdateLayout = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const { name, label, layers_, store_uuid, oldFloorPlanPath } = req.body;
    const { file: floorPlanFile } = req;
    const layers = JSON.parse(layers_);
    const _oldFloorPlanPath = oldFloorPlanPath
      ? JSON.parse(oldFloorPlanPath)
      : null;

    console.log(floorPlanFile);
    console.log(layers);

    const layout = await Layout.query().upsertGraph(
      {
        uuid,
        name,
        label,
        is_active: false,
        store_uuid,
        floor_plan_path: floorPlanFile ? floorPlanFile.path : null,
        layers,
      },
      { insertMissing: true }
    );

    if (_oldFloorPlanPath && layout) {
      await removeFiles(_oldFloorPlanPath);
    }

    layoutLogger.info(
      `layout with [UUID -${layout.uuid}] successfully updated`
    );

    res.json(layout);
  } catch (err) {
    layoutLogger.warn(`Error updating layout`);
    await removeFiles(req.file);
    next(err);
  }
};

exports.patchLayout = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const layout = await Layout.query().patchAndFetchById(uuid, {
      uuid,
      ...req.body,
    });
    layoutLogger.info(`layout successfull partial update: ${layout.uuid}`);
    res.json(layout);
  } catch (err) {
    layoutLogger.warn(`Error partially update the layout`);
    next(err);
  }
};

exports.patchMultipleLayout = async (req, res, next) => {
  try {
    const { listToUpdate, updatedPayload } = req.body;

    await Layout.query().patch(updatedPayload).whereIn('uuid', listToUpdate);

    const logMessage = `Successfully patching the following layouts: ${listToUpdate}`;
    res.json({ message: logMessage });
  } catch (err) {
    layoutLogger.warn(`Error patching the layouts `);
    next(err);
  }
};
