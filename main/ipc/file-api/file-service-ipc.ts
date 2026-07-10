import { DirLoader } from "../../module/dir-loader/dir-loader";

export class FileApi {

    public static readDirectory(path: string) {
        return new DirLoader(path).get();
    }

}; 