"use strict";

function parseUserId(namespacedUserId) {
  const [ namespace, userId ] = namespacedUserId.split("://");
  if (userId.startsWith("splus/")) {
    return { namespace, userId: userId.substr(6, userId.length - 1) };
  } else {
    return { namespace, userId };
  }
}

function parseUserIdParts(namespacedUserId) {
  const [ namespace, fullUserId ] = namespacedUserId.split("://");
  if (!fullUserId) return {};
  const [ origin, userId ] = fullUserId.split("/");
  if (!userId) {
    return { namespace, origin: undefined, userId: origin };
  }

  return { namespace, origin, userId };
}

module.exports = {
  parseUserId,
  parseUserIdParts,
};
