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
  
gbkz = "`" SPACE* query:$query SPACE* "`" { return { type: "gbkz", query: query } }

named_url = "[" url:url SPACE+ title:$(!"]" .)+ "]" { return { type: "named_url", url: url.url, title: title} }

unnamed_url = "[" url:url "]" { return { type: "url", url: url.url} }

url = url:$(scheme hostname port? path? url_query?) { return { type: "url", url } }

url_auto = url:$(scheme hostname port? url_auto_path? url_auto_query?) { return { type: "url", url } }

ara = "(ara" [:;.] SPACE* query:$(!"\x29" .)+ ")" { return { type: "ara", query: query } }

bkz = "(bkz" [\':;.] SPACE* query:$query ")" { return { type: "bkz", query: query } }

abkz = "`" SPACE* visible:query? ":" hidden:query SPACE* "`" { return { type: "abkz", text: visible, query: hidden } }

paragraph_break = line_break|2..| { return { type: "paragraph_break" } }

line_break = NEWLINE { return { type: "line_break" } }

query = $(entry_query / nick_query / title:title ("/" (nick_query / entry_query / seq))?)

nick_query = "@" nick:$nick

entry_query = "#" entry_id:$entry_id { return {type: "entry_query", entry_id: entry_id} }

nick = NICK_CHAR+ (SPACE NICK_CHAR+)*

title_component = TITLE_CHAR+ (SPACE TITLE_CHAR+)*

title = title:$title_component (SPACE "(" kind:$title_component ")")?

entry_id = NUMBER

seq = NUMBER

NUMBER = DIGIT+

SPACE = ' '

DIGIT = [0-9]

ASCII_LETTER = [a-z]

TURKISH_LETTER = [şğüöçıŞĞÜÖÇİ]

TITLE_CHAR = ASCII_LETTER / TURKISH_LETTER / DIGIT / [-._%+€/=^&$#']

NICK_CHAR = ASCII_LETTER / DIGIT

NEWLINE = [\n]
  
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