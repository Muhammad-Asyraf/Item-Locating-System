const momentTz = require('moment-timezone');
const Campaign = require('../model');
const getLogger = require('../../../utils/logger');
const { removeFiles } = require('../../../utils/general');

const campaignLogger = getLogger(__filename, 'pro motion');

exports.getAllCampaigns = async (req, res, next) => {
  try {
    const { store_uuid } = req.params;
    const campaigns = await Campaign.query().where('store_uuid', store_uuid);

    campaignLogger.info(`Successfully retrieve: ${campaigns.length} campaigns`);
    res.json(campaigns);
  } catch (err) {
    campaignLogger.warn(`Error retrieving all campaigns`);
    next(err);
  }
};

exports.findCampaign = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    const campaign = await Campaign.query().findById(uuid);

    const { start_date, end_date } = campaign;

    let startDate = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY');

    let endDate = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY');

    let startTime = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY HH:mm:ss');

    let endTime = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('MMM DD YYYY HH:mm:ss');

    startDate = `${startDate} 00:00:00 GMT+0800`;
    endDate = `${endDate} 00:00:00 GMT+0800`;
    startTime = `${startTime} GMT+0800`;
    endTime = `${endTime} GMT+0800`;

    const resPayload = {
      ...campaign,
      startDate,
      endDate,
      startTime,
      endTime,
    };

    campaignLogger.info(`Successfully retrieve the campaign: ${campaign.uuid}`);
    res.json(resPayload);
  } catch (err) {
    campaignLogger.warn(`Error retrieving campaign`);
    next(err);
  }
};

exports.removeCampaign = async (req, res, next) => {
  try {
    const { uuid } = req.params;
    await Campaign.query().deleteById(uuid);
    const logMessage = `Successfully delete campaign: ${uuid}`;
    campaignLogger.info(logMessage);
    res.json({ message: logMessage });
  } catch (err) {
    campaignLogger.warn(`Error deleting campaign`);
    next(err);
  }
};

exports.removeMultipleCampaign = async (req, res, next) => {
  try {
    const { listToDelete } = req.body;
    await Campaign.query().delete().whereIn('uuid', listToDelete);

    const logMessage = `Successfully deleted following campaigns: ${listToDelete}`;
    res.json({ message: logMessage });
  } catch (err) {
    campaignLogger.warn(`Error deleting campaigns`);
    next(err);
  }
};

exports.addCampaign = async (req, res, next) => {
  try {
    const {
      name,
      description,
      terms_conditions,
      start_date,
      end_date,
      start_time,
      end_time,
      store_uuid,
    } = req.body;
    const { file: campaignBanner } = req;

    const startDate = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const startTime = momentTz
      .tz(new Date(start_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const endDate = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const endTime = momentTz
      .tz(new Date(end_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const startDateTime = new Date(
      `${startDate} ${startTime} GMT+0800`
    ).toISOString();

    const endDateTime = new Date(
      `${endDate} ${endTime} GMT+0800`
    ).toISOString();

    const campaign = await Campaign.query().insert({
      name,
      description,
      terms_conditions,
      start_date: startDateTime,
      end_date: endDateTime,
      store_uuid,
      banner_ad_path: campaignBanner.path,
    });

    campaignLogger.info(`Successfully create the campaign: ${campaign.uuid}`);
    res.json(campaign);
  } catch (err) {
    campaignLogger.warn(`Error creating campaign`);
    await removeFiles(req.file);
    next(err);
  }
};

exports.editCampaign = async (req, res, next) => {
  try {
    const {
      name,
      description,
      terms_conditions,
      start_date,
      end_date,
      start_time,
      end_time,
      old_Banner,
      store_uuid,
    } = req.body;
    const { uuid } = req.params;
    const { file: campaignBanner } = req;
    const oldBanner = JSON.parse(old_Banner);

    const startDate = momentTz
      .tz(new Date(start_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const startTime = momentTz
      .tz(new Date(start_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const endDate = momentTz
      .tz(new Date(end_date), 'Asia/Kuala_Lumpur')
      .format('YYYY-MM-DD');
    const endTime = momentTz
      .tz(new Date(end_time), 'Asia/Kuala_Lumpur')
      .format('HH:mm:ss');

    const startDateTime = new Date(
      `${startDate} ${startTime} GMT+0800`
    ).toISOString();

    const endDateTime = new Date(
      `${endDate} ${endTime} GMT+0800`
    ).toISOString();

    const campaign = await Campaign.query().patchAndFetchById(uuid, {
      name,
      description,
      terms_conditions,
      start_date: startDateTime,
      end_date: endDateTime,
      store_uuid,
      banner_ad_path: campaignBanner.path,
    });

    await removeFiles(oldBanner);

    campaignLogger.info(`Successfully update the campaign: ${campaign.uuid}`);
    res.json(campaign);
  } catch (err) {
    campaignLogger.warn(`Error updating the campaign`);
    await removeFiles(req.file);
    next(err);
  }
};
