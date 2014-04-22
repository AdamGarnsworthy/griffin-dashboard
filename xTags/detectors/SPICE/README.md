###SPICE

`<detector-SPICE>` inherits all the standard functionality from `xDetectorTemplate` and `setupDetector`.  It includes a view for SPICE itself, and an optional S3 auxiliary

####Attributes

 - `rateServer`: full URL of JSONP post of scalar rate information for the TIP Wall.  JSON should be wrapped in a `parseRate(data)` function at this URL.
 - `thresholdServer`: full URL of JSONP post of threshold information for the TIP Wall.  JSON should be wrapped in a `parseThreshold(data)` function at this URL.
 - `auxiliary`: `S3`; auxiliary detector upstream of the target in the chamber; currently only S3 supported.