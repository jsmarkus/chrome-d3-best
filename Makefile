ROOT := $(shell pwd)
SRC := src
DIST := $(ROOT)/dist
SRCDEPS := $(shell find $(SRC) -type f)
WEBSTORE_ZIP := $(DIST)/webstore.zip

zip: $(WEBSTORE_ZIP)

clean:
	rm -rfv $(DIST)

$(WEBSTORE_ZIP): $(SRCDEPS)
	mkdir -p $(@D)
	rm -f $(SRC)/tmp.zip
	cd $(SRC) && zip -9 -y -r -q tmp.zip . && mv tmp.zip $(WEBSTORE_ZIP)

.PHONY: zip clean