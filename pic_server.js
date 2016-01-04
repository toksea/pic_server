if (Meteor.isClient) {

    Session.setDefault('tip', 'drag and drop here');

    Uploader.finished = function(index, fileInfo, templateContext) {
       console.log(fileInfo);

        var tip = '已上传：'
            // '![](' + fileInfo.url + ')';
            + '<input size="60" value="[图片](' + 'http://pic.example.com/upload' + fileInfo.path + ')'
           + '"/>';

        Session.set('tip', tip);
    };

    Template.home.helpers({
        tip: function() {

            // 如果只是修改一个变量，helper 是不会变的，session 会变
            return Session.get('tip');
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {

        UploadServer.init({
            acceptFileTypes: /.(gif|jpe?g|png)$/i,
            tmpDir: '/tmp/pic_server/uploads',
            uploadDir: process.env.PWD + '/.uploads/',
            checkCreateDirectories: true,
           maxFileSize: 11000000,
           getFileName: function(fileInfo, formData) {
               return 'Saved-' + Math.random().toString(36).substring(7)
                       + fileInfo.name.substr(fileInfo.name.indexOf('.'));
           },
            finished: function(fileInfo, formFields) {
                // name String  File name
                // size Number  Size in Bytes
                // type String  MIME file type (e.g. 'text/html')
                // path String  Path relative to upload directory
                // url  String  Full url to the uploaded file
                console.log(fileInfo);

                // perform a disk operation
            },
            cacheTime: 100,
            mimeTypes: {
                "xml": "application/xml",
                "vcf": "text/x-vcard"
            }
        });

    });
}
