const LINK_TYPE = 'link';

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function createLink(url, customCode) {
  try {
    const code = customCode || generateCode();
    
    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return { success: false, error: 'Invalid code format' };
    }

    const existing = await trickleListObjects(LINK_TYPE);
    const codeExists = existing.items.some(item => item.objectData.code === code);
    
    if (codeExists) {
      return { success: false, error: 'Code already exists', status: 409 };
    }

    const linkData = {
      code,
      url,
      clicks: 0,
      lastClicked: null,
      createdAt: new Date().toISOString()
    };

    await trickleCreateObject(LINK_TYPE, linkData);
    return { success: true, data: linkData };
  } catch (error) {
    return { success: false, error: 'Failed to create link' };
  }
}

async function fetchLinks() {
  try {
    const result = await trickleListObjects(LINK_TYPE, 100, true);
    const links = result.items.map(item => ({
      ...item.objectData,
      id: item.objectId
    }));
    return { success: true, data: links };
  } catch (error) {
    return { success: false, error: 'Failed to fetch links' };
  }
}

async function getLink(code) {
  try {
    const result = await trickleListObjects(LINK_TYPE);
    const link = result.items.find(item => item.objectData.code === code);
    
    if (!link) {
      return { success: false, error: 'Link not found' };
    }

    return { success: true, data: { ...link.objectData, id: link.objectId } };
  } catch (error) {
    return { success: false, error: 'Failed to fetch link' };
  }
}

async function updateLinkClicks(code) {
  try {
    const result = await trickleListObjects(LINK_TYPE);
    const link = result.items.find(item => item.objectData.code === code);
    
    if (!link) {
      return { success: false, error: 'Link not found' };
    }

    const updatedData = {
      ...link.objectData,
      clicks: (link.objectData.clicks || 0) + 1,
      lastClicked: new Date().toISOString()
    };

    await trickleUpdateObject(LINK_TYPE, link.objectId, updatedData);
    return { success: true, data: updatedData };
  } catch (error) {
    return { success: false, error: 'Failed to update link' };
  }
}

async function deleteLink(code) {
  try {
    const result = await trickleListObjects(LINK_TYPE);
    const link = result.items.find(item => item.objectData.code === code);
    
    if (!link) {
      return { success: false, error: 'Link not found' };
    }

    await trickleDeleteObject(LINK_TYPE, link.objectId);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete link' };
  }
}