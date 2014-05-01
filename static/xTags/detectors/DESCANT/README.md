###DESCANT

`<detector-DESCANT>` inherits all the standard functionality from `xDetectorTemplate` and `setupDetector`.

####Attributes
 - `MIDAS`: host:port of the MIDAS experiment the HV frontends for this detector are living at.
 - `rateServer`: full URL of JSONP post of scalar rate information for DESCANT.  JSON should be wrapped in a `parseRate(data)` function at this URL.
 - `thresholdServer`: full URL of JSONP post of threshold information for DESCANT.  JSON should be wrapped in a `parseThreshold(data)` function at this URL.