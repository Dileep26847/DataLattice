import api from "./api";

// ==========================================
// GET ALL NOTIFICATIONS
// ==========================================

export const getNotifications = async () => {

  const response = await api.get(
    "/notifications"
  );

  return response.data;

};


// ==========================================
// GET UNREAD COUNT
// ==========================================

export const getUnreadNotificationCount =
  async () => {

    const response = await api.get(
      "/notifications/unread-count"
    );

    return response.data;

  };


// ==========================================
// CREATE NOTIFICATION
// ==========================================

export const createNotification = async (
  notificationData
) => {

  const response = await api.post(
    "/notifications",
    notificationData
  );

  return response.data;

};


// ==========================================
// MARK ONE NOTIFICATION AS READ
// ==========================================

export const markNotificationAsRead =
  async (notificationId) => {

    const response = await api.put(
      `/notifications/${notificationId}/read`
    );

    return response.data;

  };


// ==========================================
// MARK ALL NOTIFICATIONS AS READ
// ==========================================

export const markAllNotificationsAsRead =
  async () => {

    const response = await api.put(
      "/notifications/read-all"
    );

    return response.data;

  };


// ==========================================
// DELETE NOTIFICATION
// ==========================================

export const deleteNotification =
  async (notificationId) => {

    const response = await api.delete(
      `/notifications/${notificationId}`
    );

    return response.data;

  };