.PHONY: post

post:
	touch content/notes/$(shell date +%s).md
