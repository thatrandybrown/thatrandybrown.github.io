.PHONY: note

note:
	touch content/notes/$(shell date +%s).md
