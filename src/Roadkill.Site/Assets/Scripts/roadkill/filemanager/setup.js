var Roadkill;
(function (Roadkill) {
    (function (Site) {
        (function (FileManager) {
            var Setup = (function () {
                function Setup() { }
                Setup.configure = function configure() {
                    this.initializeImagePreview();
                    this.initializeFileUpload();
                    var buttonEvents = new FileManager.ButtonEvents();
                    buttonEvents.bind();
                    var tableEvents = new FileManager.TableEvents();
                    tableEvents.bind();
                    FileManager.TableEvents.update("");
                };
                Setup.initializeImagePreview = function initializeImagePreview() {
                    var xOffset = 20;
                    var yOffset = 20;
                    $("table#files tr[data-itemtype=file]").live("mouseenter", function (e) {
                        var fileType;
                        fileType = $("td.filetype", this).text();
                        if(fileType.search(/^(jpg|png|gif)$/i) == -1) {
                            return;
                        }
                        var imgUrl;
                        imgUrl = (ROADKILL_ATTACHMENTSPATH + this.getCurrentPath() + "/");
                        imgUrl = imgUrl.replace("//", "/") + $("td.file", this).text();
                        $("body").append("<p id='image-preview'><img src='" + imgUrl + "' alt='Image Preview' /></p>");
                        $("#image-preview").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px").fadeIn("fast");
                    }).live("mouseleave", function () {
                        $("#image-preview").remove();
                    }).live("mousemove", function (e) {
                        $("#preview").css("top", (e.pageY - xOffset) + "px").css("left", (e.pageX + yOffset) + "px");
                    });
                };
                Setup.initializeFileUpload = function initializeFileUpload() {
                    $("#fileupload").fileupload({
                        dropZone: $("#folder-container"),
                        pasteZone: $("body"),
                        dataType: 'json',
                        progressall: function (e, data) {
                            var percentage = (data.loaded / data.total * 100) + "";
                            var progress = parseInt(percentage, 10);
                            $('#progress .bar').css('width', progress + '%');
                        },
                        done: function (e, data) {
                            if(data.result.status == "error") {
                                alert(data.result.message);
                                return;
                            }
                            $.each(data.result.files, function (index, file) {
                                $('#files').append(this._navigator.getFileRowHtml(file));
                            });
                            setTimeout(function () {
                                $("#progress div.bar").css("width", "0%");
                            }, 2000);
                        }
                    }).bind('fileuploaddrop', function (e, data) {
                        this._navigator.setCurrentPath();
                    });
                };
                return Setup;
            })();
            FileManager.Setup = Setup;            
        })(Site.FileManager || (Site.FileManager = {}));
        var FileManager = Site.FileManager;
    })(Roadkill.Site || (Roadkill.Site = {}));
    var Site = Roadkill.Site;
})(Roadkill || (Roadkill = {}));