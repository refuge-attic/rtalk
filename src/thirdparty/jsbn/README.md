# JSBN

The jsbn library is a fast, portable implementation of large-number math
in pure JavaScript, enabling public-key crypto and other applications on
desktop and mobile browsers.

http://www-cs-students.stanford.edu/~tjw/jsbn/

Changes
=======

* Version 1.4 (7/1/2013):
 - Fixed variable name collision between sha1.js and base64.js.
 - Obtain entropy from window.crypto.getRandomValues where available.
 - Added ECCurveFp.encodePointHex.
 - Fixed inconsistent use of DV in jsbn.js.
