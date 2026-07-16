// ekşi sözlük entry markup syntax
// ssg - 2024-08-02

// run .\generate-parser.cmd to build the parser

eksi_text = (directive / $plain_text)+
  
directive = ara
  / bkz
  / gbkz
  / abkz
  / named_url
  / unnamed_url
  / entry_query
  / url_auto
  / paragraph_break
  / line_break
  
gbkz = "`" WS* query:$query WS* "`" { return { type: "gbkz", query: query.trim() } }

named_url = "[" url:url WS+ title:$anchor_text "]" { return { type: "named_url", url: url.url, title: title.trim()} }

unnamed_url = "[" url:url WS* "]" { return { type: "url", url: url.url.trim() } }

url = url:$(scheme hostname port? path? url_query?) { return { type: "url", url } }

url_auto = url:$(scheme hostname port? url_auto_path? url_auto_query?) { return { type: "url", url } }

ara = "(ara" [:;.] WS* query:$ara_query_component WS* ")" { return { type: "ara", query: query.trim() } }

bkz = "(bkz" [.:;] WS* query:$query WS* ")" { return { type: "bkz", query: query.trim() } }

abkz = "`" text:$abkz_text? SPACE* ":" WS* query:$query SPACE* "`" { return { type: "abkz", text: text.trim(), query: query.trim() } }

paragraph_break = line_break|2..| { return { type: "paragraph_break" } }

line_break = NEWLINE { return { type: "line_break" } }

query = !nick_query query_component (SPACE* "(" query_component ")")? query_component?

nick_query = "@" $nick

entry_query = "#" entry_id:$entry_id { return {type: "entry_query", entry_id: entry_id} }

nick = NICK_CHAR+ (SPACE NICK_CHAR+)*

entry_id = "0"* [1-9] DIGIT* !LETTER

scheme = "http://" / "https://" / "ftp://"

hostname = dns_label ("." dns_label)*

dns_label = [\p{L}\p{N}\-_]+

port = ":" [0-9]|1..5|

path = "/" [^?/\x20\n\]]* path*

url_auto_path = "/" url_auto_segment* url_auto_path*

url_auto_segment = url_auto_segment_part+ / "(" url_auto_segment_part* ")"

url_auto_segment_part = [^?/\x20\n\]()] / "(" url_auto_segment_part* ")"

url_query = "?" [^\x20\n\]]*

url_auto_query = "?" url_auto_query_string*

url_auto_query_string = url_auto_query_string_part+ / "(" url_auto_query_string_part* ")"

url_auto_query_string_part = [^\x20\n\]()] / "(" url_auto_query_string_part* ")"

plain_text = (!directive .)+

anchor_text = title:$(!"]" .)+

abkz_text = [^\n\x20:()`]+ (" " abkz_text)*

query_component = query_word (SPACE+ query_word*)*

query_word = [^:`()\x20\n]+

ara_query_component = query_word (WS+ query_word*)*

SPACE = ' '

DIGIT = [0-9]

LETTER = [\p{L}]

ASCII_LETTER = [a-z]

NICK_CHAR = ASCII_LETTER / DIGIT

NEWLINE = [\n]

WS = SPACE / NEWLINE
