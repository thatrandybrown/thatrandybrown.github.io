.PHONY: post

post:
	touch content/thoughts/$(shell date +%s).md
