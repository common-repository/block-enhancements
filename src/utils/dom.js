export class SearchParams {
  constructor(url = "") {
    if (!url) {
      url = window.location.href;
    }
    this.parsedURL = new URL(url);
  }

  get(prop, defaultVal = null) {
    const value = this.parsedURL.searchParams.get(prop);

    if (value) {
      return value;
    }

    return defaultVal;
  }
  set(prop, value, pushState = true) {
    this.parsedURL.searchParams.set(prop, value);
    if (pushState && history.pushState) {
      history.pushState({}, null, this.parsedURL.href);
    }
  }
  delete(prop, pushState = true) {
    this.parsedURL.searchParams.delete(prop);
    if (pushState && history.pushState) {
      history.pushState({}, null, this.parsedURL.href);
    }
  }
  reload() {
    if (history?.go) {
      history.go();
    } else {
      window.location.reload();
    }
  }
  getHref() {
    return this.parsedURL.href;
  }
}
