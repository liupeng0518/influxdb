package testing

var FluxEndToEndSkipList = map[string]string{
	// TODO(adam) determine the reason for these test failures.
	"cov":                      "Reason TBD",
	"covariance":               "Reason TBD",
	"cumulative_sum":           "Reason TBD",
	"cumulative_sum_default":   "Reason TBD",
	"cumulative_sum_noop":      "Reason TBD",
	"drop_non_existent":        "Reason TBD",
	"first":                    "Reason TBD",
	"highestAverage":           "Reason TBD",
	"highestMax":               "Reason TBD",
	"histogram":                "Reason TBD",
	"histogram_normalize":      "Reason TBD",
	"histogram_quantile":       "Reason TBD",
	"join":                     "Reason TBD",
	"join_across_measurements": "Reason TBD",
	"join_agg":                 "Reason TBD",
	"keep_non_existent":        "Reason TBD",
	"key_values":               "Reason TBD",
	"key_values_host_name":     "Reason TBD",
	"last":                     "Reason TBD",
	"lowestAverage":            "Reason TBD",
	"max":                      "Reason TBD",
	"min":                      "Reason TBD",
	"sample":                   "Reason TBD",
	"selector_preserve_time":   "Reason TBD",
	"shift":                    "Reason TBD",
	"shift_negative_duration":  "Reason TBD",
	"task_per_line":            "Reason TBD",
	"top":                      "Reason TBD",
	"union":                    "Reason TBD",
	"union_heterogeneous":      "Reason TBD",
	"unique":                   "Reason TBD",
	"distinct":                 "Reason TBD",

	// it appears these occur when writing the input data.  `to` may not be null safe.
	"fill_bool":   "failed to read meta data: panic: interface conversion: interface {} is nil, not uint64",
	"fill_float":  "failed to read meta data: panic: interface conversion: interface {} is nil, not uint64",
	"fill_int":    "failed to read meta data: panic: interface conversion: interface {} is nil, not uint64",
	"fill_string": "failed to read meta data: panic: interface conversion: interface {} is nil, not uint64",
	"fill_time":   "failed to read meta data: panic: interface conversion: interface {} is nil, not uint64",
	"fill_uint":   "failed to read meta data: panic: interface conversion: interface {} is nil, not uint64",
	"window_null": "failed to read meta data: panic: interface conversion: interface {} is nil, not float64",

	// these may just be missing calls to range() in the tests.  easy to fix in a new PR.
	"group_nulls":      "unbounded test",
	"integral":         "unbounded test",
	"integral_columns": "unbounded test",
	"map":              "unbounded test",

	// the following tests have a difference between the CSV-decoded input table, and the storage-retrieved version of that table
	"columns":            "group key mismatch",
	"set":                "column order mismatch",
	"simple_max":         "_stop missing from expected output",
	"derivative":         "time bounds mismatch (engine uses now() instead of bounds on input table)",
	"difference_columns": "data write/read path loses columns x and y",
	"keys":               "group key mismatch",

	// failed to read meta data errors: the CSV encoding is incomplete probably due to data schema errors.  needs more detailed investigation to find root cause of error
	"filter_by_regex":             "failed to read metadata",
	"filter_by_tags":              "failed to read metadata",
	"group":                       "failed to read metadata",
	"group_except":                "failed to read metadata",
	"group_ungroup":               "failed to read metadata",
	"pivot_mean":                  "failed to read metadata",
	"histogram_quantile_minvalue": "failed to read meta data: no column with label _measurement exists",
	"increase":                    "failed to read meta data: table has no _value column",

	"string_max":                  "error: invalid use of function: *functions.MaxSelector has no implementation for type string (https://github.com/influxdata/platform/issues/224)",
	"null_as_value":               "null not supported as value in influxql (https://github.com/influxdata/platform/issues/353)",
	"string_interp":               "string interpolation not working as expected in flux (https://github.com/influxdata/platform/issues/404)",
	"to":                          "to functions are not supported in the testing framework (https://github.com/influxdata/flux/issues/77)",
	"covariance_missing_column_1": "need to support known errors in new test framework (https://github.com/influxdata/flux/issues/536)",
	"covariance_missing_column_2": "need to support known errors in new test framework (https://github.com/influxdata/flux/issues/536)",
	"drop_before_rename":          "need to support known errors in new test framework (https://github.com/influxdata/flux/issues/536)",
	"drop_referenced":             "need to support known errors in new test framework (https://github.com/influxdata/flux/issues/536)",
	"yield":                       "yield requires special test case (https://github.com/influxdata/flux/issues/535)",
	"rowfn_with_import":           "imported libraries are not visible in user-defined functions (https://github.com/influxdata/flux/issues/1000)",
	"string_trim":                 "imported libraries are not visible in user-defined functions (https://github.com/influxdata/flux/issues/1000)",

	"window_group_mean_ungroup": "window trigger optimization modifies sort order of its output tables (https://github.com/influxdata/flux/issues/1067)",

	"median_column": "failing in different ways (https://github.com/influxdata/influxdb/issues/13909)",
	"dynamic_query": "panic when executing",

	"regexp_replaceAllString": "Reason TBD",
}
