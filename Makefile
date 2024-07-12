.PHONY: post

post:
	touch content/blog/$(shell date +%s).md
