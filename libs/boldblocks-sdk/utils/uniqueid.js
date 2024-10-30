/**
 * External dependencies
 */
import { nanoid } from "nanoid";

/**
 * WordPress dependencies
 */
import { useEffect } from "@wordpress/element";

/**
 * Store ids
 */
const ids = {};

/**
 * Generate unique id
 *
 * @param {String} clientId
 * @param {String} id
 * @returns {String}
 */
const maybeUpdateId = (clientId, id) => {
  if (ids[clientId] ?? "") {
    return false;
  }

  if (!id || Object.values(ids).includes(id)) {
    const newId = nanoid(10);

    setId(clientId, newId);

    return newId;
  } else {
    setId(clientId, id);
  }

  return false;
};

/**
 * Set id for the block
 *
 * @param {String} clientId
 * @param {String} id
 */
const setId = (clientId, id) => {
  ids[clientId] = id;
};

export const useUniqueId = (
  id,
  clientId,
  onUpdateId,
  inNeedOfUniqueId = true
) => {
  const newId = inNeedOfUniqueId ? maybeUpdateId(clientId, id) : false;
  useEffect(() => {
    if (newId && onUpdateId) {
      // Callback
      onUpdateId(newId);
    }

    return () => setId(clientId, null);
  }, [newId, onUpdateId]);

  return newId ? newId : id;
};
