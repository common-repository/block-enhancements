/**
 * External dependencies
 */
import { isNil } from "lodash";
import isDeepEqual from "fast-deep-equal/es6";

/**
 * WordPress dependencies
 */
import { useEffect, useState, useRef, useCallback } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import { log } from "../utils";

/**
 * Build an object for dependencies in hooks
 *
 * @param {Object} value
 * @returns
 */
export const useValueRef = (value) => {
  const valueRef = useRef(value);

  if (!isDeepEqual(valueRef.current, value)) {
    valueRef.current = value;
  }

  return valueRef;
};

/**
 * Check whether is the first render or not
 */
export const useIsMounted = () => {
  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = false;
  }, []);
  return isMountedRef.current;
};

/**
 * Manage data with localStorage
 *
 * @param {String} key
 * @param {Object} defaultValue
 * @returns {Array}
 */
export const useLocalStorage = (key, defaultValue = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const savedValue = JSON.parse(localStorage.getItem(key));
      if (isNil(savedValue)) {
        return defaultValue;
      }

      return savedValue;
    } catch (error) {
      log(error, "error");
      return defaultValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);

    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

/**
 * Check whether an element is in viewport or not
 *
 * @param {Object} options
 *
 * @returns {Array}
 */
export const useIsInView = (options = { root: null, rootMargin: "0px" }) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.unobserve(ref.current);
    };
  }, []);
  return [ref, isIntersecting];
};

/**
 * Only save the sanitized version of a value
 *
 * @param {String} value
 * @param {Function} update
 * @returns {Array}
 */
export const useSanitizedValue = (value, update) => {
  const [rawValue, setRawValue] = useState(value);
  useEffect(() => {
    if (rawValue !== value) {
      update(rawValue);
    }
  }, [rawValue, value]);

  return [rawValue, setRawValue];
};

/**
 * Build a hook for apiFetch
 */
const DEFAULT_FETCH_OPTIONS = {
  headers: { "Content-Type": "application/json" },
  method: "GET",
};

export const useApiFetch = (path, options = {}, dependencies = []) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    apiFetch({ path, ...{ ...DEFAULT_FETCH_OPTIONS, ...options } })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, dependencies);

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized]);

  return { loading, error, data };
};
