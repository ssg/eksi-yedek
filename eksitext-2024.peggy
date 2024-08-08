// ekşi sözlük entry markup syntax
// ssg - 2024-08-02

eksi_text = (directive / plain_text)+
  
directive = bkz
  / gbkz
  / abkz
  / named_url
  / url
  / paragraph_break
  / line_break
  
gbkz = "`" SPACE* query:$query SPACE* "`" { return { type: "gbkz", query: query } }

named_url = "[" url:url SPACE+ title:plain_text "]"

url = url:$(scheme host port? path? url_query?) { return { type: "url", url } }

bkz = "(bkz" [\':;.] SPACE* query:$query ")" { return { type: "bkz", query: query } }

abkz = "`" SPACE* visible:query? ":" hidden:query SPACE* "`" { return { type: "abkz", text: visible, query: hidden } }

paragraph_break = line_break|2..| { return { type: "paragraph_break" } }

line_break = NEWLINE { return { type: "line_break" } }

query = $(entry_query / nick_query / title:title ("/" (nick_query / entry_query / seq))?)

nick_query = "@" nick:$nick

entry_query = "#" entry_id:$entry_id

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

TITLE_CHAR = ASCII_LETTER / TURKISH_LETTER / DIGIT

NICK_CHAR = ASCII_LETTER / DIGIT

NEWLINE = [\n]
  
scheme = "http" "s"? "://"

host = [a-z-0-9.]+

port = ":[0-9]{1,5}"

path = "/" [^?/]* path*

url_query = "?" [^\x0020\]]+

plain_text = $(!directive [^`([\n\r]+)